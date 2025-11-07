import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock, DollarSign, ArrowRight, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

interface DiagnosticResult {
  issue: string;
  recommendation: string;
  estimatedCost: string;
  timeToFix: string;
  serviceType: string;
  technicalDetails: string;
  bookingMessage: string;
}

const DiagnosticTool = () => {
  const [step, setStep] = useState(1);
  const [mainIssue, setMainIssue] = useState("");
  const [storageType, setStorageType] = useState("");
  const [ramAmount, setRamAmount] = useState("");
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const getRecommendation = (): DiagnosticResult => {
    // Slow computer logic
    if (mainIssue === "slow") {
      if (storageType === "hdd" || storageType === "not-sure") {
        return {
          issue: "Slow Computer (Likely Hard Drive Issue)",
          recommendation: "I see this all the time in Johannesburg homes and offices. Your computer's probably still using an old spinning hard drive (HDD), which is like trying to run a marathon in flip-flops. An SSD upgrade will make your computer feel brand new – I'm talking Windows booting in 10 seconds instead of 3 minutes.",
          estimatedCost: "R900-R1,300 (500GB-1TB SSD) + R150 service",
          timeToFix: "1 hour on-site or mail-in service",
          serviceType: "Hardware Upgrade",
          technicalDetails: "Most laptops from before 2020 still have HDDs. An SSD is 10-20x faster for everyday tasks. I install it, transfer your data, and you're done – no reinstalling Windows needed.",
          bookingMessage: "Hi Clive, my computer's running slow and I think I need an SSD upgrade. Can you help?"
        };
      } else if (ramAmount === "4gb-less") {
        return {
          issue: "Slow Computer (Low RAM)",
          recommendation: "Ah, 4GB of RAM in 2025 is rough. That's barely enough for Windows 11 alone, never mind Chrome with 10 tabs open. I've upgraded dozens of laptops in Bedfordview and Edenvale – bumping you to 8GB or 16GB makes a huge difference. Your computer will stop freezing when you switch between programs.",
          estimatedCost: "R450-R850 (8GB-16GB RAM) + R150 service",
          timeToFix: "45 minutes on-site",
          serviceType: "Hardware Upgrade",
          technicalDetails: "RAM is your computer's short-term memory. 4GB was fine in 2015, but modern Windows + apps need more. Upgrading is simple and makes a massive difference.",
          bookingMessage: "Hi Clive, my laptop has 4GB RAM and it's struggling. Can you upgrade it for me?"
        };
      } else {
        return {
          issue: "Slow Computer (Software Optimization Needed)",
          recommendation: "Good news – you've got decent hardware, so this is probably a software mess. I see this constantly: too many startup programs, temp files clogging the system, maybe some sneaky malware. I can clean this up remotely in about 30-45 minutes. No need to lug your laptop anywhere.",
          estimatedCost: "R150 remote session",
          timeToFix: "30-45 minutes",
          serviceType: "Remote Support",
          technicalDetails: "I'll connect remotely (you watch the whole time), disable bloatware, clean temp files, check for malware, and optimize startup. Most clients see a massive speed boost immediately.",
          bookingMessage: "Hi Clive, my computer's slow but I think it's software issues. Can you do a remote cleanup?"
        };
      }
    }

    // Won't turn on
    if (mainIssue === "wont-turn-on") {
      return {
        issue: "Computer Won't Turn On",
        recommendation: "This one's tricky to diagnose remotely, but I can walk you through some quick checks over the phone or WhatsApp first – it might be something simple like a loose power cable or battery issue. If that doesn't work, I'll need to see it in person. I've fixed hundreds of these in Lombardy East and surrounds – could be power supply, motherboard, or just a stuck power button.",
        estimatedCost: "R400 callout + diagnosis (repair cost depends on issue)",
        timeToFix: "1-2 hours for diagnosis, same-day fix if parts available",
        serviceType: "On-Site Diagnosis",
        technicalDetails: "First I'll check: power cable, battery, display connection. If those are fine, it's usually motherboard or power supply. I carry common parts in my car, so I can often fix it the same day.",
        bookingMessage: "Hi Clive, my computer won't turn on at all. Can you help diagnose it?"
      };
    }

    // Blue screen errors
    if (mainIssue === "blue-screen") {
      return {
        issue: "Blue Screen Errors (BSOD)",
        recommendation: "Blue screens are Windows' way of saying 'something's seriously wrong – I'm stopping before I break everything.' The good news? I can usually diagnose these remotely by checking your error logs. Common causes in Joburg: loadshedding damage to hard drives, driver conflicts, RAM issues, or malware. Let me connect remotely first – it's cheaper than a callout.",
        estimatedCost: "R150 remote diagnosis (may recommend hardware check if needed)",
        timeToFix: "30-60 minutes for diagnosis",
        serviceType: "Remote Support",
        technicalDetails: "I'll read your crash dumps (the error logs), identify the problem driver/hardware, and fix it if it's software-related. If it's a dying hard drive or RAM, I'll recommend on-site service.",
        bookingMessage: "Hi Clive, I keep getting blue screens. Can you diagnose it remotely?"
      };
    }

    // Virus/Malware
    if (mainIssue === "virus") {
      return {
        issue: "Virus or Malware Suspected",
        recommendation: "Let's get that sorted quickly before it gets worse. I remove viruses remotely all the time – usually takes 30-45 minutes. I'll scan your system, remove the nasties, and secure your browser (that's where most infections come from). If it's really bad, I might recommend a full Windows reload, but let's try cleaning it first.",
        estimatedCost: "R150 remote cleanup (R200 if full reload needed)",
        timeToFix: "30-60 minutes",
        serviceType: "Remote Support",
        technicalDetails: "I use professional tools to deep-scan your system, remove malware, check browser extensions, and secure your settings. You can watch the whole process. I'll also show you how to avoid this in future.",
        bookingMessage: "Hi Clive, I think my computer has a virus. Can you remove it remotely?"
      };
    }

    // WiFi/Printer issues
    if (mainIssue === "wifi-printer") {
      return {
        issue: "Wi-Fi or Printer Problems",
        recommendation: "These are my bread and butter – I fix these remotely every week. Wi-Fi issues are usually driver problems, router settings, or Windows being weird about network adapters. Printers? Don't get me started – they're temperamental at the best of times. I can usually sort both remotely in 20-30 minutes. Way cheaper than someone driving out to just click a few buttons.",
        estimatedCost: "R120 remote session",
        timeToFix: "20-30 minutes",
        serviceType: "Remote Support",
        technicalDetails: "For Wi-Fi: I'll check drivers, adapter settings, router config (if you give me access), and Windows network troubleshooter. For printers: driver reinstall, port config, and network discovery settings. Fixed remotely 95% of the time.",
        bookingMessage: "Hi Clive, I'm having Wi-Fi/printer issues. Can you help remotely?"
      };
    }

    // Default fallback
    return {
      issue: "General IT Support Needed",
      recommendation: "No worries, I deal with all sorts of IT issues daily. The best first step is to WhatsApp or call me, and we can chat about what's happening. I'll let you know if it's something I can fix remotely (usually R120-R150) or if I need to come out (R400 callout). Either way, I'll give you an honest assessment – if it's not worth fixing, I'll tell you straight up.",
      estimatedCost: "R120-R400 depending on issue",
      timeToFix: "Varies – let's chat first",
      serviceType: "Consultation",
      technicalDetails: "Call or WhatsApp 067 049 4876 and describe what's happening. I'll give you a quick assessment and let you know the best way forward.",
      bookingMessage: "Hi Clive, I need some IT help. Can we chat about my issue?"
    };
  };

  const handleSubmit = () => {
    const recommendation = getRecommendation();
    setResult(recommendation);
  };

  const reset = () => {
    setStep(1);
    setMainIssue("");
    setStorageType("");
    setRamAmount("");
    setResult(null);
  };

  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/27670494876?text=${encodeURIComponent(message)}`;
  };

  if (result) {
    return (
      <Card className="w-full max-w-3xl mx-auto shadow-lg border-primary/20">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-success" />
            <CardTitle className="text-2xl">Here's What I'd Recommend</CardTitle>
          </div>
          <CardDescription className="text-base">
            Based on what you've told me about your {result.issue.toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-lg">{result.issue}</h3>
            <p className="text-muted-foreground leading-relaxed">{result.recommendation}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-background rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Estimated Cost</h4>
              </div>
              <p className="text-sm text-muted-foreground">{result.estimatedCost}</p>
            </div>

            <div className="bg-background rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Time to Fix</h4>
              </div>
              <p className="text-sm text-muted-foreground">{result.timeToFix}</p>
            </div>

            <div className="bg-background rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <h4 className="font-semibold">Service Type</h4>
              </div>
              <p className="text-sm text-muted-foreground">{result.serviceType}</p>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <h4 className="font-semibold mb-2">How It Works</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{result.technicalDetails}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              asChild 
              size="lg" 
              className="flex-1 bg-success hover:bg-success/90"
            >
              <a 
                href={getWhatsAppLink(result.bookingMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Clive Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline"
              className="flex-1"
            >
              <Link to="/booking">
                Book via Form Instead
              </Link>
            </Button>
          </div>

          <Button 
            onClick={reset} 
            variant="ghost" 
            className="w-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Free Tool</Badge>
          <Badge variant="outline">Takes 30 seconds</Badge>
        </div>
        <CardTitle className="text-2xl md:text-3xl">Is Your Laptop Slow? Let's Figure Out Why</CardTitle>
        <CardDescription className="text-base">
          I'm Clive, and I've been fixing computers in Johannesburg for 9+ years. Answer a couple of quick questions and I'll tell you what's wrong and how to fix it.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-3 block">
                What's your main issue?
              </Label>
              <RadioGroup value={mainIssue} onValueChange={setMainIssue}>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value="slow" id="slow" />
                  <Label htmlFor="slow" className="cursor-pointer flex-1">
                    Computer running slow (takes forever to start, programs lag)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value="wont-turn-on" id="wont-turn-on" />
                  <Label htmlFor="wont-turn-on" className="cursor-pointer flex-1">
                    Won't turn on at all (black screen, no lights)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value="blue-screen" id="blue-screen" />
                  <Label htmlFor="blue-screen" className="cursor-pointer flex-1">
                    Blue screen errors (crashes, BSOD messages)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value="virus" id="virus" />
                  <Label htmlFor="virus" className="cursor-pointer flex-1">
                    Virus or malware suspected (pop-ups, weird behavior)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value="wifi-printer" id="wifi-printer" />
                  <Label htmlFor="wifi-printer" className="cursor-pointer flex-1">
                    Wi-Fi or printer issues (can't connect, won't print)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {mainIssue && (
              <Button 
                onClick={() => {
                  if (mainIssue === "slow") {
                    setStep(2);
                  } else {
                    handleSubmit();
                  }
                }}
                className="w-full"
                size="lg"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {step === 2 && mainIssue === "slow" && (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-3 block">
                Do you have an SSD or HDD? (Don't worry if you're not sure)
              </Label>
              <RadioGroup value={storageType} onValueChange={setStorageType}>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value="ssd" id="ssd" />
                  <Label htmlFor="ssd" className="cursor-pointer flex-1">
                    SSD (Solid State Drive – the fast one)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value="hdd" id="hdd" />
                  <Label htmlFor="hdd" className="cursor-pointer flex-1">
                    HDD (Spinning hard drive – I can hear it whirring)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value="not-sure" id="not-sure" />
                  <Label htmlFor="not-sure" className="cursor-pointer flex-1">
                    Not sure (my laptop's from before 2020 though)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {storageType && (
              <Button 
                onClick={() => setStep(3)}
                className="w-full"
                size="lg"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}

            <Button 
              onClick={() => setStep(1)}
              variant="ghost"
              className="w-full"
            >
              Back
            </Button>
          </div>
        )}

        {step === 3 && mainIssue === "slow" && (
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-3 block">
                How much RAM do you have? (Check 'System' in Settings if unsure)
              </Label>
              <RadioGroup value={ramAmount} onValueChange={setRamAmount}>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value="4gb-less" id="4gb-less" />
                  <Label htmlFor="4gb-less" className="cursor-pointer flex-1">
                    4GB or less (struggling with multitasking)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value="8gb" id="8gb" />
                  <Label htmlFor="8gb" className="cursor-pointer flex-1">
                    8GB (decent for most tasks)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value="16gb-more" id="16gb-more" />
                  <Label htmlFor="16gb-more" className="cursor-pointer flex-1">
                    16GB or more (should be plenty)
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value="not-sure-ram" id="not-sure-ram" />
                  <Label htmlFor="not-sure-ram" className="cursor-pointer flex-1">
                    Not sure (let me guess based on other answers)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {ramAmount && (
              <Button 
                onClick={handleSubmit}
                className="w-full"
                size="lg"
              >
                Get My Recommendation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}

            <Button 
              onClick={() => setStep(2)}
              variant="ghost"
              className="w-full"
            >
              Back
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DiagnosticTool;
