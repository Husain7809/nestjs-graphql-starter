import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => User, { name: 'create_user' })
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'get_all_users' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'get_user_by_id' })
  async findOne(@Args('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Mutation(() => String, { name: 'delete_user' })
  async removeUser(@Args('id') id: string) {
    return await this.userService.remove(id);
  }
}
