declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      CORS_ORIGIN: string;
      JDOODLE_CLIENT_ID: string;
      JDOODLE_CLIENT_SECRET: string;
    }
  }
}

export {}
