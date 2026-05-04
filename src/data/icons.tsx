import React from 'react';
import {
  Server, Shield, Key, Terminal, Lock, AlertCircle, CheckCircle, ChevronRight, ChevronDown,
  BookOpen, Home, Settings, Flame, Copy, Check, ShoppingCart, Wifi, Package, Globe, Database, Activity,
  HelpCircle, Wrench, FileText, Cpu, HardDrive, Zap, Info, ArrowRight, Monitor, Cloud, Layers,
  Network, Clock, Search, Edit, Save, RefreshCw, BarChart3, FolderOpen, Play, Square, RotateCcw, Heart
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Server, Shield, Key, Terminal, Lock, AlertCircle, CheckCircle, ChevronRight, ChevronDown,
  BookOpen, Home, Settings, Flame, Copy, Check, ShoppingCart, Wifi, Package, Globe, Database, Activity,
  HelpCircle, Wrench, FileText, Cpu, HardDrive, Zap, Info, ArrowRight, Monitor, Cloud, Layers,
  Network, Clock, Search, Edit, Save, RefreshCw, BarChart3, FolderOpen, Play, Square, RotateCcw, Heart,
};

export function getIcon(iconName: string, className = 'w-6 h-6'): React.ReactNode {
  const IconComponent = iconMap[iconName];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}
