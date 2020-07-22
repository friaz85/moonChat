import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { DocumentService } from "src/app/document.service";
import { Subscription } from "rxjs";
import { Document } from "src/app/document";
import { startWith } from "rxjs/operators";

@Component({
  selector: "app-document",
  templateUrl: "./document.component.html",
  styleUrls: ["./document.component.css"],
})
export class DocumentComponent implements OnInit, OnDestroy {
  document: Document;
  private _docSub: Subscription;
  arrMsg = [];
  @ViewChild("message", { static: false }) message: ElementRef;
  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this._docSub = this.documentService.currentDocument
      .pipe(
        startWith({
          id: "",
          doc:
            "Selecciona un chat del menú o crea uno nuevo para inicar la conversación.",
        })
      )
      .subscribe((document) => (this.document = document));
  }

  ngOnDestroy() {
    this._docSub.unsubscribe();
  }

  editDoc() {
    let msg = this.message.nativeElement.value;
    console.log(this.message.nativeElement.value);
    console.log();
    this.arrMsg.push({
      messages: msg,
    });
    this.document.doc = this.document.doc + "\n" + msg;
    this.documentService.editDocument(this.document);
    this.message.nativeElement.value = "";
    console.log(this.arrMsg);
  }
}
