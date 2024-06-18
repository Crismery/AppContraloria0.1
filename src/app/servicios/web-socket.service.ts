import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket$: WebSocketSubject<any> | undefined;
  private messagesSubject = new Subject<MessageEvent>();
  public messages$ = this.messagesSubject.asObservable();

  constructor() {}

  public connect(url: string): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = new WebSocketSubject(url);
      this.socket$.subscribe(
        msg => this.messagesSubject.next(msg),
        err => this.messagesSubject.error(err),
        () => this.messagesSubject.complete()
      );
    }
  }

  public sendMessage(message: any): void {
    if (this.socket$) {
      this.socket$.next(message);
    }
  }

  public close(): void {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
}
