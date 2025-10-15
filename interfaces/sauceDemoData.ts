export interface SauceDemoUser {
  username: string;
  password: string;
}

export interface SauceDemoData {
  users: {
    standard: SauceDemoUser;
    locked: SauceDemoUser;
    problem: SauceDemoUser;
    performance_glitch: SauceDemoUser;
  };
}

