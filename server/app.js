import express from 'express';
import router from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './documentation/swagger.json';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.use('/api/v1/docs', swaggerUi.serve);
router.get('/api/v1/docs', swaggerUi.setup(swaggerDocument));

app.use(router);
app.listen(PORT, () => {
  console.log(`Quickcredit app started on http://localhost:${PORT}; press Ctrl-C to terminate.`);
});

export default app;
