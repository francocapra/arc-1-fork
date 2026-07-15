/**
 * ARC-1 — ABAP Relay Connector
 *
 * MCP (Model Context Protocol) server for SAP ABAP systems.
 * Provides 12 intent-based tools for AI agents to interact with SAP ADT.
 *
 * Entry point: starts the MCP server on stdio (default) or HTTP Streamable transport.
 */

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from 'dotenv';
import { resolveConfig } from './server/config.js';
import { createAndStartServer } from './server/server.js';

// Load .env before anything else. Keep stdout clean for stdio MCP JSON-RPC.
// First honor a .env in the current working directory (dev convenience), then fall back
// to the install-dir .env (next to this script) so the server finds its config regardless
// of the launcher's cwd — e.g. when an MCP client spawns it from another project's folder.
// dotenv never overrides an already-set variable, so real env vars and the cwd .env still win.
config({ quiet: true });
config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../.env'), quiet: true });

const { config: serverConfig, sources } = resolveConfig(process.argv.slice(2));
await createAndStartServer(serverConfig, sources);
