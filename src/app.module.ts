import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    // graphql confiuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],

      // format error message and statuscode
      formatError: (err) => {
        const errObj = {
          message: 'INTERNAL_SERVER_ERROR',
          statusCode: '500',
        };
        errObj.message = err.message;
        errObj.statusCode = `${err.extensions.code}`;
        return errObj;
      },
    }),

    // mongodb configuration
    MongooseModule.forRoot(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    }),

    // api module
    UserModule,
  ],
})
export class AppModule {}
