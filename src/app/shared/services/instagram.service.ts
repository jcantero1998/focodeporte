import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Posts } from '@core/models/instagram.interface';
import { environment } from '@envs/environment';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  private accessToken = environment.instagram.accessToken;
  private apiUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${this.accessToken}`;
  private http = inject(HttpClient);

  getInstagramPosts(): Observable<Posts> {
    return this.http.get<Posts>(this.apiUrl);
  }

}
