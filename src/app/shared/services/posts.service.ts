import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '@angular/fire/storage';
import { DocumentData, DocumentReference, Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { Post } from '@core/models/post.interfaces';
import { APP_CONSTANTS } from '@shared/constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly _firestore = inject(Firestore);
  private readonly _postCollection = collection(this._firestore, APP_CONSTANTS.COLLECTION_NAME);
  private readonly _storage = inject(Storage);

  uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const filePath = `images/${Date.now()}_${file.name}`;
      const fileRef = ref(this._storage, filePath);
      const task = uploadBytesResumable(fileRef, file);

      task.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Progreso de la carga: ' + progress + '%');
        },
        (error) => {
          console.error('Error en la subida del fichero:', error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(fileRef);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }

  async newPost(post: Partial<Post>, imageFile?: File): Promise<DocumentReference<DocumentData>> {
    try {
      let image = '';
      if (imageFile) {
        image = await this.uploadImage(imageFile);
      }

      const newPostData = {
        created: Date.now(),
        updated: Date.now(),
        image,
        ...post,
      };

      return addDoc(this._postCollection, newPostData);
    } catch (error) {
      console.error("Error al crear el post:", error);
      throw error;
    }
  }

  getAllPosts():Observable<Post[]> {
    const queryFn = query(this._postCollection, orderBy('created', 'desc'));
    return collectionData(queryFn, {idField: 'id'}) as Observable<Post[]>
  }

  async getPostById(id:string):Promise<Post> {
    const docRef = this._getDocRef(id);
    const documentData = await getDoc(docRef);
    return documentData.data() as Post;
  }

  async updatePost(id: string, post: Post, imageFile?: File): Promise<void> {
    try {
      let image = '';
      if (imageFile) {
        const post = await this.getPostById(id);
        if (post.image) await this.deleteImage(post.image);
        image = await this.uploadImage(imageFile);
        post.image = image;
      }
      post.updated = Date.now();
      const docRef = this._getDocRef(id);
      return updateDoc(docRef, { ...post });

    } catch (error) {
      console.error("Error al editar el post:", error);
      throw error;
    }

  }

  deleteImage(imageUrl: string): Promise<void> {
    //TODO: Comprobar que existe antes de eliminarlo para que no de error
    const imageRef = ref(this._storage, imageUrl);
    return deleteObject(imageRef);
  }

  async deletePost(id: string, post: Post): Promise<void> {
    try {
      if (post.image) await this.deleteImage(post.image);
      const docRef = this._getDocRef(id);
      return deleteDoc(docRef);
    } catch (error) {
      console.error("Error al eliminar el post:", error);
      throw error;
    }
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME, id);
  }
}
