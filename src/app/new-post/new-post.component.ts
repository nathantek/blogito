import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../services/post.service';
import { Post } from '../model/post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  postForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private postsService: PostService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ''
    });
  }

  onSavePost() {
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    const date = new Date().getTime();
    const newPost = new Post(title, content, date);
    this.postsService.createNewPost(newPost);
    this.router.navigate(['/posts']);
  }
}
