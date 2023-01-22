import axios from 'axios';
import { requestErrorInterceptor } from '@/api/http/interceptors/Request.error.interceptor';
import { responseErrorInterceptor } from '@/api/http/interceptors/Response.error.interceptor';
import { responseInterceptor } from '@/api/http/interceptors/Response.interceptor';

const transport = axios.create({ timeout: 20000 });

transport.interceptors.request.use((config) => config, requestErrorInterceptor);
transport.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default transport;
