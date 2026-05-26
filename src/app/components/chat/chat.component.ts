import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  standalone: true, // וודא שזה מוגדר כ-Standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush // מונע סריקות מיותרות
})
export class ChatComponent {
  messages: { role: string; content: string }[] = [];
  input = '';
  loading = false;
  isOpen = false;

  constructor(private chatService: ChatService, private cdr: ChangeDetectorRef) {}

  send() {
    if (!this.input.trim() || this.loading) return;
    
    const msg = this.input;
    this.input = '';
    this.loading = true;
    this.messages.push({ role: 'user', content: msg });
    
    // סימון שהשינוי בוצע לאחר הוספת ההודעה
    this.cdr.detectChanges(); 

    this.chatService.send(msg, this.messages.slice(0, -1)).subscribe({
      next: res => {
        this.messages.push({ role: 'assistant', content: res.reply });
        this.loading = false;
        this.cdr.detectChanges(); // עדכון ה-UI רק כאן
      },
      error: () => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // פונקציית עזר ל-trackBy כדי למנוע רינדור מחדש של כל הרשימה
  trackByFn(index: number, item: any) {
    return index; 
  }

  onKey(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      this.send();
    }
  }
}