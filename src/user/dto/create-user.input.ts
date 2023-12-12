import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  first_name: string;

  @Field(() => String)
  @IsNotEmpty()
  last_name: string;
}
