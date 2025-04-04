import {AfterViewChecked, Component, inject, OnDestroy} from '@angular/core';
import {addDoc, collection, Firestore, onSnapshot, orderBy, query, Timestamp, CollectionReference} from '@angular/fire/firestore';
import {Auth, User} from '@angular/fire/auth';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HeaderComponent} from '../header/header.component';

interface ChatMessage {
  author_name: string,
  message: string,
  sent_at: Timestamp,
  author_id: string,
}

@Component({
  selector: 'app-chat',
  imports: [ReactiveFormsModule, HeaderComponent], templateUrl: './chat.component.html', styleUrl: './chat.component.css'
})
export class ChatComponent implements OnDestroy, AfterViewChecked {
  private auth = inject(Auth);
  user: User | null = null;
  auth_user_unsubscribe = this.auth.onAuthStateChanged((user) => {
    if (user) {
      this.user = user;
    }
  });
  private firestore = inject(Firestore);
  messages: ChatMessage[] = [];
  messagesCollection = collection(this.firestore, 'messages') as CollectionReference<ChatMessage, ChatMessage>;
  messages_collection_unsubscribe = onSnapshot(
    query(this.messagesCollection, orderBy("sent_at")),
    snapshot => {
      this.messages = snapshot.docs.map(doc => doc.data());
    }
  );
  messageForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  handleSubmit() {
    if (this.messageForm.invalid) {
      return;
    }
    addDoc(this.messagesCollection, <ChatMessage> {
      message: this.messageForm.value.message,
      author_id: this.user?.uid,
      author_name: this.user?.displayName,
      sent_at: new Timestamp(new Date().getTime() / 1000, 0),
    })
      .catch(err => {
        alert(`Failed to send message: ${err}`);
      });

    this.messageForm.setValue({
      message: ''
    });
  }

  ngAfterViewChecked() {
    const chatList = document.getElementById('chat-list');
    if (chatList) {
      chatList.scrollTop = chatList.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    this.auth_user_unsubscribe();
    this.messages_collection_unsubscribe();
  }
}
