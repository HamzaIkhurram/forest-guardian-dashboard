
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-alerts">Email Alerts</Label>
              <Switch id="email-alerts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-alerts">SMS Alerts</Label>
              <Switch id="sms-alerts" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="push-alerts">Push Notifications</Label>
              <Switch id="push-alerts" defaultChecked />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alert-email">Alert Email</Label>
              <Input id="alert-email" defaultValue="alerts@example.com" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="alert-phone">Alert Phone Number</Label>
              <Input id="alert-phone" defaultValue="+1 (555) 123-4567" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-recording">Automatic Recording</Label>
              <Switch id="auto-recording" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="sound-filtering">Noise Filtering</Label>
              <Switch id="sound-filtering" defaultChecked />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="storage-limit">Storage Limit (GB)</Label>
              <Input id="storage-limit" defaultValue="500" type="number" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retention-days">Data Retention (days)</Label>
              <Input id="retention-days" defaultValue="30" type="number" />
            </div>
            
            <Button className="w-full">Save Configuration</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
