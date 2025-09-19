import { PipelineToolbar } from './components/toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './components/submit';    
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
      <Toaster/>
    </div>
  );
}

export default App;
