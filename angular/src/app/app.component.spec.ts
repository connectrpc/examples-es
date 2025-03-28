import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { provideConnect } from "src/connect/connect.module";
import { ELIZA } from "src/connect/tokens";

describe("AppComponent", () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideConnect({
          baseUrl: "https://demo.connectrpc.com",
        }),
      ],
      imports: [AppComponent, FormsModule],
    }).compileComponents();
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Eliza'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual("Eliza");
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("h1")?.textContent).toContain("Eliza");
  });

  it("should correctly inject the ElizaService", () => {
    const service = TestBed.inject(ELIZA);
    expect(service.say).toBeDefined();
    expect(service.introduce).toBeDefined();
  });
});
