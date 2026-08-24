import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from "path";

let client:Client |null = null;

export const getMcpClient = async ()=>{


    if(client){
        return client;
    }
    const mcpServerPath = path.resolve(process.cwd(), "../mcp_server/src/index.ts");
    const transport = new StdioClientTransport({
        command: "npx",
        args: [
            "tsx",
            mcpServerPath,
        ]
    })

    client = new Client({
        name:"tiny-cats-client",
        version:"1.0.0",
        
    });


    await client.connect(transport);

    return client;
}
