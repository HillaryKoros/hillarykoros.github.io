import { Route, Switch } from 'wouter';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import WorkPage from './pages/WorkPage';
import WorkDetailPage from './pages/WorkDetailPage';
import WritingPage from './pages/WritingPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60]
                   focus:rounded-md focus:bg-primary focus:px-4 focus:py-2
                   focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <ScrollToTop />
      <Header />

      <main id="main" className="flex-1">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/work" component={WorkPage} />
          <Route path="/work/:id">{(params) => <WorkDetailPage id={params.id} />}</Route>
          <Route path="/writing" component={WritingPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </main>

      <Footer />
    </div>
  );
}
