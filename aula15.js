//default
import http from 'k6/http';

//remoto
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.11.0/s3.js'

//local
import runTest from './test1.js'