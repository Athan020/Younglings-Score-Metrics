import { DatabaseService } from './../../services/database/database.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-po-comment',
  templateUrl: './po-comment.component.html',
  styleUrls: ['./po-comment.component.css']
})
export class PoCommentComponent implements OnInit {

  @Input()
  team;

  constructor(protected readonly db: DatabaseService) {
  }

  ngOnInit() {
    this.db.getLatestPoComment(this.team);
  }

}
