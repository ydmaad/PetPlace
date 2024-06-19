import { createClient } from '@supabase/supabase-js';
const SupabaseProviders = Object.freeze({
    Kakao: 'kakao',
    Google: 'google',
    Notion: 'notion',
});

class Supabase {
    constructor() {
        this.supabase = createClient(
            'https://poqwfetctkypmqybscsj.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcXdmZXRjdGt5cG1xeWJzY3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg2OTEyMDEsImV4cCI6MjAzNDI2NzIwMX0.NZ-JYMPw4gyhaKt8heqtKXV-dqBD2Ph6cNB-xcN0Ljw'
        );
    }

    async isSignIn() {
        const session = await this.supabase.auth.getSession();
        return !!session.data.session;
    }

    async getSession() {
        const { data, error } = await this.supabase.auth.getSession();
        if (error) {
            console.error(error);
        } else {
            return data;
        }
    }

    async signIn(provider) {
        await this.supabase.auth.signInWithOAuth({
            provider
        });
        return this.isSignIn();
    }

    async signOut() {
        return await this.supabase.auth.signOut();
    }
}

const supabase = new Supabase();
export default supabase;
export { SupabaseProviders };
