import { z } from "zod";

export default class UserRequest {
    static store() {
        return z.object({
            first_name: z.string(),
            last_name: z.string().nullable(),
            phone: z.string().length(11),
        });
    }
}