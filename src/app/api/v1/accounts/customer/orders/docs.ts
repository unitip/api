import { swaggerSecurity } from "@/lib/swagger/security";

export const accountCustomerOrdersPaths = {
  "/api/v1/accounts/customer/orders": {
    get: {
      tags: ["Account"],
      security: swaggerSecurity,
      responses: {
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  orders: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        // title: { type: "string" },
                        note: { type: "string" },
                        created_at: { type: "string" },
                        updated_at: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
