import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { provideClient } from 'src/connect/client.provider'
import { ConnectModule } from 'src/connect/connect.module'
import { ElizaService } from 'src/gen/buf/connect/demo/eliza/v1/eliza_connectweb'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [
            AppComponent
        ],
        providers: [provideClient(ElizaService)],
        imports: [
            FormsModule,
            ConnectModule.forRoot({
                baseUrl: 'https://demo.connect.build',
            }),
        ],
    }).compileComponents();
  });

  it('should create the app', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app).toBeTruthy();
  });

  it(`should have as title 'Eliza'`, () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      expect(app.title).toEqual('Eliza');
  });

  it('should render title', () => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain('Eliza');
  });

  it('should correctly inject the ElizaService', () => {
      const service = TestBed.get(ElizaService);
      expect(service.say).toBeDefined();
      expect(service.introduce).toBeDefined();
  });
});
