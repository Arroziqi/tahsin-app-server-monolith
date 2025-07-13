import { PORT } from './secret';
import { web } from './common/web';
import listRoutes from 'express-list-routes';

web.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);

  listRoutes(web, { prefix: '' });
});
