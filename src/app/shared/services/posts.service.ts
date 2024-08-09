import { Injectable, inject } from '@angular/core';
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

  newPost(post:Partial<Post>):Promise<DocumentReference<DocumentData, DocumentData>> {
    return addDoc(this._postCollection, {
      created: Date.now(),
      updated: Date.now(),
      ...post,
    })
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
