import { Injectable } from '@angular/core';
import { UserSettings } from './user-settings';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  /**
   * all the network request here should come from this place this is to avoid scattering things all around the
   * the place and make things as encapsulated as possible
   * @param http 
   */

  constructor(private http: HttpClient) { }

  getSubscriptionTypes(): Observable<string[]>{
    return of(['Monthly', 'Annually', 'Lifetime']);
  }

  postUserSettingsForm(userSettings: UserSettings) : Observable <any>{
    return this.http.post('http://localhost/living-stone/ps-form-demo.php', userSettings);
    // return of(userSettings)
  }


}
