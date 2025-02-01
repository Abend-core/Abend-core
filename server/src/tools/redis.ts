import { createClient } from "redis";

class Redis {
    private static instance: Redis;
    private client;
    constructor() {
        if (!Redis.instance) {
            this.client = createClient({
                url: "redis://default:abend-core@redis:6379",
            });

            this.client.on("error", (err) => console.error("Redis : ", err));

            this.client
                .connect()
                .then(() => console.log("   [Redis] ✅ Connecté"))
                .catch((err) => console.error("     [Redis] ❌ Erreur", err));

            Redis.instance = this;
        }
        return Redis.instance;
    }

    getClient() {
        return this.client;
    }

    async setCache(
        key: string,
        value: any,
        expiration: number = 86400
    ): Promise<any> {
        await this.client!.set(key, JSON.stringify(value), { EX: expiration });
    }

    async getCache(key: string) {
        const data = await this.client!.get(key);
        return data ? JSON.parse(data) : null;
    }
}

export default new Redis();
