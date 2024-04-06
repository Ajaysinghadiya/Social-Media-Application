import { ID, Query } from 'appwrite';
import { account, 
    // appwriteConfig,
     avatars, databases } from "./config";
import { INewUser } from "@/types";

export async function createUserAccount(user:INewUser){
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );
        if(!newAccount){
             console.error("Account creation failed.");
        }
        // if(!newAccount) throw error;
        const avatarUrl = avatars.getInitials(user.name);
        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name:newAccount.name,
            email:newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });

        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user:{
        accountId:string;
        email:string;
        name:string;
        imageUrl:URL;
        username?:string;
    }){
        try {
            const newUser = await databases.createDocument(
                
                '65d4396d0edad7e27c60',// appwriteConfig.databaseId,
                
                '65d43a3f9beb738c91f4',// appwriteConfig.userCollectionId,
                ID.unique(),
                user,
            )
            return newUser;
        } catch (error) {
            console.log(error);
        }
}

export async function signInAccount(user:{ email: string; password: string}) {
    try {
        
        const session = await account.createEmailSession(user.email, user.password);

        return session;


    } catch (error) {
        console.log (error)
    }
    
}

export async function getCurrentUser() {
    try {
       const currentAccount = await account.get();
       if(!currentAccount){
             console.error("Account dosnt exist.");
       }
       const currentUser = await databases.listDocuments(
        '65d4396d0edad7e27c60',// appwriteConfig.databaseId,
        '65d43a3f9beb738c91f4',// appwriteConfig.userCollectionId,
        [Query.equal('accountId', currentAccount.$id)]
       ); 

       if(!currentUser){
             console.error("Account dosnt exist.");
       }
       return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}