import React from "react";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Info,
  Lightbulb,
  MessageCircle,
  Sparkles,
  Flame,
  Star,
  Sprout,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ArrowUpRight,
  Activity,
  Heart,
  Users,
  Clock,
  Bell,
  BarChart3,
} from "lucide-react";

// NUDGE Color palette - Blue theme
export const COLORS = {
  primary: "#2563eb", // Blue 600
  lightBg: "#eff6ff", // Blue 50
  accentWarm: "#60a5fa", // Blue 400
  softNeutral: "#dbeafe", // Blue 100
  secondaryAccent: "#3b82f6", // Blue 500
};

// ============ STAT CARD ============
export const StatCard: React.FC<{
  label: string;
  value: string | number;
  trend?: number;
  color?: string;
  unit?: string;
}> = ({ label, value, trend, color = COLORS.primary, unit }) => (
  <div
    className="rounded-3xl p-8 shadow-sm border border-gray-100/50 hover:shadow-md transition-all duration-300 group"
    style={{
      background: `linear-gradient(135deg, ${color}08 0%, ${color}02 100%)`,
      borderColor: `${color}20`,
    }}
  >
    <p className="text-gray-500 text-xs font-medium tracking-wide mb-4 uppercase">
      {label}
    </p>
    <div className="flex items-baseline gap-3">
      <p className="text-5xl font-bold tracking-tight" style={{ color: color }}>
        {value}
      </p>
      {unit && <p className="text-gray-500 text-sm font-medium">{unit}</p>}
    </div>
    {trend !== undefined && (
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center gap-1 ${
            trend > 0
              ? "bg-emerald-100/70 text-emerald-700"
              : "bg-orange-100/70 text-orange-700"
          }`}
        >
          {trend > 0 ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}{" "}
          {Math.abs(trend)}%
        </span>
      </div>
    )}
  </div>
);

// ============ CARD ============
export const Card: React.FC<{
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, icon, children, className = "" }) => (
  <div
    className={`bg-white rounded-3xl shadow-sm border border-gray-100/50 p-8 hover:shadow-md transition-all duration-300 ${className}`}
  >
    {title && (
      <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-3">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {title}
      </h3>
    )}
    {children}
  </div>
);

// ============ BUTTON ============
export const Button: React.FC<{
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ variant = "primary", onClick, children, className = "" }) => {
  const baseClasses =
    "px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-md active:scale-95";

  const variantClasses = {
    primary: `text-white shadow-sm hover:shadow-md`,
    secondary: `border-2 font-semibold text-sm`,
    outline: `border-2 border-gray-300 text-gray-700 hover:bg-gray-50`,
  };

  const getBackground = () => {
    if (variant === "primary") {
      return `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondaryAccent} 100%)`;
    }
    if (variant === "secondary") {
      return `linear-gradient(135deg, ${COLORS.accentWarm} 0%, ${COLORS.softNeutral} 100%)`;
    }
    return "transparent";
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={
        variant !== "outline" ? { background: getBackground() } : undefined
      }
    >
      {children}
    </button>
  );
};

// ============ ALERT BOX ============
export const AlertBox: React.FC<{
  type: "info" | "success" | "warning" | "insight";
  title?: string;
  message: string;
  icon?: React.ReactNode;
}> = ({ type, title, message, icon }) => {
  const configs = {
    info: {
      bg: "bg-blue-50/50",
      border: "border-blue-100",
      text: "text-blue-900",
      iconColor: "text-blue-600",
      Icon: Info,
    },
    success: {
      bg: "bg-emerald-50/50",
      border: "border-emerald-100",
      text: "text-emerald-900",
      iconColor: "text-emerald-600",
      Icon: CheckCircle,
    },
    warning: {
      bg: "bg-amber-50/50",
      border: "border-amber-100",
      text: "text-amber-900",
      iconColor: "text-amber-600",
      Icon: AlertTriangle,
    },
    insight: {
      bg: "bg-violet-50/50",
      border: "border-violet-100",
      text: "text-violet-900",
      iconColor: "text-violet-600",
      Icon: Lightbulb,
    },
  };

  const config = configs[type];
  const IconComponent = config.Icon;

  return (
    <div
      className={`${config.bg} ${config.border} border rounded-2xl p-5 mb-4 backdrop-blur-sm hover:shadow-sm transition-shadow`}
    >
      <div className="flex gap-4">
        <div className={`flex-shrink-0 ${config.iconColor}`}>
          {icon || <IconComponent className="w-5 h-5" />}
        </div>
        <div>
          {title && (
            <p className={`font-semibold ${config.text} text-sm mb-2`}>
              {title}
            </p>
          )}
          <p className={`text-sm leading-relaxed ${config.text}`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

// ============ BADGE ============
export const RiskLevelBadge: React.FC<{
  level:
    | "stable"
    | "improving"
    | "needs-attention"
    | "low"
    | "medium"
    | "high"
    | string;
}> = ({ level }) => {
  const configs: Record<
    string,
    {
      bg: string;
      text: string;
      label: string;
      Icon: React.ComponentType<{ className?: string }>;
    }
  > = {
    stable: {
      bg: "bg-emerald-100/70",
      text: "text-emerald-700",
      label: "Stable",
      Icon: ShieldCheck,
    },
    improving: {
      bg: "bg-blue-100/70",
      text: "text-blue-700",
      label: "Improving",
      Icon: TrendingUp,
    },
    "needs-attention": {
      bg: "bg-amber-100/70",
      text: "text-amber-700",
      label: "Needs Attention",
      Icon: AlertTriangle,
    },
    low: {
      bg: "bg-emerald-100/70",
      text: "text-emerald-700",
      label: "Low Risk",
      Icon: ShieldCheck,
    },
    medium: {
      bg: "bg-amber-100/70",
      text: "text-amber-700",
      label: "Medium Risk",
      Icon: Shield,
    },
    high: {
      bg: "bg-red-100/70",
      text: "text-red-700",
      label: "High Risk",
      Icon: ShieldAlert,
    },
  };

  const config = configs[level] || {
    bg: "bg-gray-100/70",
    text: "text-gray-700",
    label: level || "Unknown",
    Icon: Activity,
  };

  const IconComponent = config.Icon;

  return (
    <span
      className={`${config.bg} ${config.text} text-xs font-semibold px-4 py-2 rounded-full inline-flex items-center gap-2`}
    >
      <IconComponent className="w-3.5 h-3.5" /> {config.label}
    </span>
  );
};

// ============ SUGGESTION ITEM ============
export const SuggestionItem: React.FC<{
  title: string;
  description: string;
  priority?: "low" | "medium" | "high";
  icon?: string;
}> = ({ title, description, priority = "medium", icon }) => (
  <div
    className="rounded-2xl p-6 border border-gray-100/50 hover:shadow-md hover:border-gray-200/70 transition-all duration-300 group cursor-pointer"
    style={{
      background: `linear-gradient(135deg, ${COLORS.lightBg}08 0%, ${COLORS.softNeutral}04 100%)`,
    }}
  >
    <div className="flex items-start gap-4">
      {icon && <span className="text-2xl flex-shrink-0 mt-1">{icon}</span>}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="font-semibold text-gray-800 text-sm group-hover:text-gray-900">
            {title}
          </h4>
          {priority && (
            <span
              className={`text-xs font-bold rounded-full px-2.5 py-1 flex-shrink-0 ${
                priority === "high"
                  ? "bg-orange-100/70 text-orange-700"
                  : priority === "medium"
                    ? "bg-blue-100/70 text-blue-700"
                    : "bg-emerald-100/70 text-emerald-700"
              }`}
            >
              {priority}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

// ============ NOTIFICATION ITEM ============
export const NotificationItem: React.FC<{
  type: string;
  message: string;
  timestamp: Date;
  read?: boolean;
}> = ({ type, message, timestamp, read = false }) => {
  const getIcon = () => {
    switch (type) {
      case "positive":
        return <Sparkles className="w-4 h-4 text-amber-500" />;
      case "insight":
        return <Lightbulb className="w-4 h-4 text-violet-500" />;
      default:
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div
      className={`rounded-2xl p-4 border border-gray-100/50 transition-all duration-300 ${
        read ? "bg-white/40" : "bg-blue-50/40 border-blue-100/50"
      }`}
    >
      <div className="flex gap-3">
        <span className="flex-shrink-0 mt-0.5">{getIcon()}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
          <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timestamp.toLocaleDateString()} {timestamp.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};

// ============ INSIGHT PANEL ============
export const InsightPanel: React.FC<{
  insights: { observation: string; category?: string; timeframe?: string }[];
}> = ({ insights }) => (
  <Card title="Insights" icon={<Sparkles className="w-5 h-5 text-amber-500" />}>
    <div className="space-y-4">
      {insights.map((insight, idx) => (
        <div
          key={idx}
          className="pb-5 border-b border-gray-100/50 last:border-b-0 hover:bg-gray-50/40 rounded-xl p-4 transition-colors"
        >
          {insight.category && (
            <p
              className="text-xs font-bold uppercase tracking-wider mb-3"
              style={{ color: COLORS.primary }}
            >
              {insight.category}
              {insight.timeframe && ` • ${insight.timeframe}`}
            </p>
          )}
          <p className="text-sm text-gray-700 leading-relaxed">
            {insight.observation}
          </p>
        </div>
      ))}
    </div>
  </Card>
);

// ============ GAMIFICATION WIDGET ============
export const GamificationWidget: React.FC<{
  streak?: { currentStreak: number } | number;
  points?: { thisWeek: number } | number;
  pet?: { name: string; type: string };
  petName?: string;
  petType?: string;
}> = ({ streak, points, pet, petName, petType }) => {
  const streakValue =
    typeof streak === "number" ? streak : streak?.currentStreak || 0;
  const pointsValue =
    typeof points === "number" ? points : points?.thisWeek || 0;
  const showPet = pet || (petName && petType);

  return (
    <Card>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-red-100/40 to-orange-100/40">
          <div className="flex justify-center mb-2">
            <Flame className="w-8 h-8 text-orange-500" />
          </div>
          <p className="font-bold text-gray-800 text-lg">{streakValue}</p>
          <p className="text-xs text-gray-600 mt-1">Day Streak</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-yellow-100/40 to-amber-100/40">
          <div className="flex justify-center mb-2">
            <Star className="w-8 h-8 text-amber-500" />
          </div>
          <p className="font-bold text-gray-800 text-lg">{pointsValue}</p>
          <p className="text-xs text-gray-600 mt-1">This Week</p>
        </div>
        {showPet && (
          <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-green-100/40 to-emerald-100/40">
            <div className="flex justify-center mb-2">
              <Sprout className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="font-bold text-gray-800 text-sm">
              {pet?.name || petName}
            </p>
            <p className="text-xs text-gray-600 mt-1">{pet?.type || petType}</p>
          </div>
        )}
      </div>
    </Card>
  );
};
