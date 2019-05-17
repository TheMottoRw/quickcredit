import express from 'express';
import router from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './documentation/swagger.json';
import jwt from 'jsonwebtoken';
import APP_KEY from './helpers/config';
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('superSecret', APP_KEY);
router.use('/api/v1/docs', swaggerUi.serve);
router.get('/api/v1/docs', swaggerUi.setup(swaggerDocument));

app.use(router);
app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    data: {
      message: 'Route does not found',
  }
});
});
app.listen(PORT, () => {
  console.log(`Quickcredit app started on http://localhost:${PORT}; press Ctrl-C to terminate.`);
});

export default app;
