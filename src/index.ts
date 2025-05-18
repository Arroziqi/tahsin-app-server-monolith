import { PORT } from './secret';
import { web } from './common/web';

web.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
