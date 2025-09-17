import type { Express, RequestHandler } from "express";
import { supabase, supabaseAdmin, isSupabaseAvailable } from "./lib/supabase";
import { storage } from "./storage";

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string;
}

// Middleware to verify JWT tokens from Supabase
export const verifySupabaseToken: RequestHandler = async (req: any, res, next) => {
  try {
    if (!isSupabaseAvailable()) {
      return res.status(500).json({ error: "Authentication not configured" });
    }

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify the token with Supabase
    const { data: { user }, error } = await supabase!.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Store user info in request for use in routes
    req.user = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || user.user_metadata?.full_name,
      firstName: user.user_metadata?.first_name,
      lastName: user.user_metadata?.last_name,
      profileImageUrl: user.user_metadata?.avatar_url,
    };

    // Ensure user exists in our database
    await storage.upsertUser({
      replitUserId: user.id,
      email: user.email,
      firstName: user.user_metadata?.first_name,
      lastName: user.user_metadata?.last_name,
      profileImageUrl: user.user_metadata?.avatar_url,
    });

    next();
  } catch (error) {
    console.error("Auth verification error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

// Middleware to check authentication (but not fail if not authenticated)
export const optionalAuth: RequestHandler = async (req: any, res, next) => {
  try {
    if (!isSupabaseAvailable()) {
      req.user = null;
      return next();
    }

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      req.user = null;
      return next();
    }

    const { data: { user }, error } = await supabase!.auth.getUser(token);
    
    if (error || !user) {
      req.user = null;
      return next();
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name || user.user_metadata?.full_name,
      firstName: user.user_metadata?.first_name,
      lastName: user.user_metadata?.last_name,
      profileImageUrl: user.user_metadata?.avatar_url,
    };

    next();
  } catch (error) {
    console.error("Optional auth error:", error);
    req.user = null;
    next();
  }
};

// Middleware that requires authentication
export const requireAuth: RequestHandler = (req: any, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
};

// Setup Supabase authentication
export async function setupSupabaseAuth(app: Express) {
  console.log("[SUCCESS] Supabase authentication system enabled");
}

// Export the auth check function (replacement for isAuthenticated)
export const isAuthenticated = [verifySupabaseToken, requireAuth];