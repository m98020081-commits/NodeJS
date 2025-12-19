const express = require('express');
const cors = require('cors'); 
const logger = require('./middleware/logger'); 
const errorHandler = require('./middleware/erroeHandler');
const notFoundHandler = require('./middleware/notFoundHandler');

const paintingRoutes = require('./routes/paintingRoutes');
const countRoutes = require ('./routes/countRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

if(process.env.NODE_ENV==='development'){
app.use(logger);
}

app.use('/api/paintings', paintingRoutes);
app.use('/api/count',countRoutes);


app.get('/health',(req,res)=>{
  res.json({
    success:true,
    massage:'Сервер работате прекрасно',
    timestamp:new Date().toISOString()
  });
});
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Режим: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Статус: http://localhost:${PORT}/health`);
  console.log(`API картин: http://localhost:${PORT}/api/paintings`);

});
