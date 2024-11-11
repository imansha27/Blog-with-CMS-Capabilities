import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import db from "../../../lib/db";

export default NextAuth({
    providers:[
        Providers.Credentials ({
            async authorize(Credentials){
                //check if the user exsits
                const user =await db.get("SELECCT * FROM user WHERE email=? AND password=?",[Credentials.email, Credentials.password]);
            
                //if exsists return user details else error message
                if(user){
                    return {id:user.id, name:user.name, email:user.email,role:user.role};
                } else{
                    throw new Error("Invalid credentials");

                }
            
            },

        }),
    ],
    callbacks:{

        // add user.id and user.role to the session
        async session ({session,token}){
            session.user.id=token.id;
            session.user.role = token.role;
            return session;
            
        },
        //
        async jwt ({token,user}){

            if(user){
                token.id=user.id;
                token.role=user.role;

            }
            return token;
        },
    },
    pages:{
        signIn:"/page"
    }
})