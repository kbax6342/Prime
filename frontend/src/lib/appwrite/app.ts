import {INewUser} from '@/types';
import { ID } from 'appwrite';
import { account, appwriteConfig, avatars, database } from './config';

export async function createUserAccount(user: INewUser){
    try{
        //creating a new account for authentication
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
            
        )
     
        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl

        });

        return newUser;
    }catch(error){
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user: {
   accountId: string;
   email: string;
   name: string;
   imageUrl: URL;
   username?: string;
} ) {
    try{
        const newUser = await database.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        );

        return newUser;
    }catch(error){
        console.log(error)
    }
}

// ============================== SIGN IN
export async function signInAccount(user: { 
    email: string; 
    password: string 
}) {
    try {
      const session = await account.createEmailSession(
        user.email, 
        user.password
        );
  
      return session;
      
    } catch (error) {
      console.log(error);
    }
  }
  
