import { Component, OnInit, OnDestroy } from "@angular/core";
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
    this.documentService.editDocument(this.document);
  }
}
