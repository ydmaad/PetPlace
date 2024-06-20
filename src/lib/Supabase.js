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

    async setBookmark(post_id, liked) {
        const isSignIn = await this.isSignIn();
        if (!isSignIn) {
            return {
                success: false,
                message: '로그인이 필요합니다.'
            };
        }

        const user_data = await this.supabase.auth.getUser();
        if (liked) {
            const result = await this.supabase.from('bookmark').insert([{ bookmark_item_id: post_id, user_id: user_data.data.user.id }]);
            if (result.error) {
                return {
                    success: false,
                    message: '북마크 설정에 실패했습니다: ' + result.statusText
                };
            }
        } else {
            const result = await this.supabase
                .from('bookmark')
                .delete()
                .eq('user_id', user_data.data.user.id)
                .eq('bookmark_item_id', post_id);
            if (result.error) {
                return {
                    success: false,
                    message: '북마크 해제에 실패했습니다: ' + result.statusText
                };
            }
        }

        return {
            success: true,
            message: '성공적으로 설정되었습니다.'
        };
    }

    async getBookmarks() {
        const isSignIn = await this.isSignIn();
        if (!isSignIn) {
            return [];
        }

        const user_data = await this.supabase.auth.getUser();
        const { data, error } = await this.supabase
            .from('bookmark')
            .select('bookmark_item_id')
            .eq('user_id', user_data.data.user.id);

        if (error) {
            console.error(error);
            return [];
        }
        return data.map((item) => item.bookmark_item_id);
    }
}

const supabase = new Supabase();
export default supabase;
export { SupabaseProviders };
