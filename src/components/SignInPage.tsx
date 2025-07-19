
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Fish, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { SecureStorage } from '@/utils/secureStorage';
import { useToast } from '@/hooks/use-toast';
import { SecurityUtils } from '@/utils/security';

interface SignInPageProps {
  onSignInComplete: (userData: LoginInfo) => void;
}

interface LoginInfo {
  email: string;
  name: string;
  loginTime: string;
}

interface SignInFormData {
  email: string;
  password: string;
  name: string;
}

const SignInPage = ({ onSignInComplete }: SignInPageProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [showSecurityWarning, setShowSecurityWarning] = useState(true);
  const { toast } = useToast();
  
  const form = useForm<SignInFormData>({
    defaultValues: {
      email: '',
      password: '',
      name: ''
    }
  });

  const onSubmit = SecurityUtils.createSecureFormHandler(async (data: SignInFormData) => {
    // Check rate limiting
    if (!SecurityUtils.checkLoginRateLimit()) {
      setRateLimitExceeded(true);
      toast({
        title: "Too Many Attempts",
        description: "Please wait before trying again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setRateLimitExceeded(false);
    
    try {
      // Basic validation for demo purposes (no complex schema validation)
      if (!data.email || !data.name || !data.password) {
        throw new Error('Please fill in all fields');
      }

      if (data.name.length < 2) {
        throw new Error('Name must be at least 2 characters');
      }

      if (!data.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      // SECURITY: Demo authentication - passwords are NOT stored
      console.warn('🚨 DEMO MODE: Password not stored or validated - this is for demonstration only');
      
      // Simulate authentication delay (replace with real auth in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const loginInfo: LoginInfo = {
        email: data.email,
        name: data.name,
        loginTime: new Date().toISOString()
      };
      
      // Save login info securely (NO PASSWORD STORAGE)
      SecureStorage.setItem('user_login', loginInfo);
      SecureStorage.setItem('is_logged_in', true);
      SecureStorage.updateSessionTimestamp();
      
      toast({
        title: "Demo Login Successful! 🎣",
        description: `Welcome ${loginInfo.name}! (Demo Mode)`,
      });
      
      onSignInComplete(loginInfo);
      
      // Clear sensitive form data from memory
      SecurityUtils.clearSensitiveMemory(data);
      
    } catch (error: any) {
      console.error('Sign in failed:', error);
      toast({
        title: "Sign In Failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="min-h-screen water-gradient flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Security Warning Banner */}
      {showSecurityWarning && (
        <div className="fixed top-4 left-4 right-4 z-50 max-w-4xl mx-auto">
          <div className="bg-orange-500/90 text-white p-3 rounded-lg shadow-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1 text-sm">
              <strong>Demo Mode:</strong> This is simulated authentication for demonstration only. 
              Do not enter real passwords or sensitive information.
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20 text-xs"
              onClick={() => setShowSecurityWarning(false)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <Fish className="absolute top-20 left-10 w-12 h-12 text-white animate-gentle-bounce" />
        <Fish className="absolute bottom-20 right-10 w-8 h-8 text-white animate-gentle-bounce" style={{ animationDelay: '1s' }} />
        <Fish className="absolute top-1/2 right-20 w-10 h-10 text-white animate-gentle-bounce" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md space-y-6 animate-fade-in">
        {/* Logo and title */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Fish className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              MM Fishing Club
            </h1>
            <p className="text-white/80 mt-2">
              Sign in to continue your fishing journey
            </p>
          </div>
        </div>

        {/* Sign in form */}
        <Card className="game-card border-white/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-primary flex items-center justify-center gap-2">
              <Shield className="w-5 h-5" />
              Demo Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter any information to access the demo fishing app
            </CardDescription>
            {rateLimitExceeded && (
              <div className="text-sm text-destructive text-center bg-destructive/10 p-2 rounded">
                Too many sign-in attempts. Please wait before trying again.
              </div>
            )}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Display Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter any name"
                          {...field}
                          className="bg-white/50"
                          maxLength={50}
                          disabled={isLoading || rateLimitExceeded}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Demo)</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="demo@example.com"
                          {...field}
                          className="bg-white/50"
                          maxLength={100}
                          required
                          disabled={isLoading || rateLimitExceeded}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password (Not Stored)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter any password"
                            {...field}
                            className="bg-white/50 pr-10"
                            maxLength={128}
                            required
                            disabled={isLoading || rateLimitExceeded}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading || rateLimitExceeded}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full game-button" 
                  disabled={isLoading || rateLimitExceeded}
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Demo Sign In
                    </>
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-1 mb-2">
                <AlertTriangle className="w-3 h-3 text-orange-500" />
                Demo mode - passwords not stored
              </div>
              This is a demonstration fishing app. Enter any credentials to explore!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
