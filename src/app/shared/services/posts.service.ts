import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
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

  updatePost(id: string, post: Post):void {
    const docRef = this._getDocRef(id);
    updateDoc(docRef, { ...post });
  }

  deletePost(id: string):void {
    const docRef = this._getDocRef(id);
    deleteDoc(docRef);
  }

  private _getDocRef(id: string) {
    return doc(this._firestore, APP_CONSTANTS.COLLECTION_NAME, id);
  }
}
