import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiFileText, FiTrendingUp, FiActivity, FiPlus, FiArrowRight } from 'react-icons/fi';
import type { IconType } from 'react-icons';

interface DashboardStats {
  totalUsers: number;
  totalPosts: number;
  recentActivity: number;
  growthRate: number;
}

interface StatCardProps {
  icon: IconType;
  title: string;
  value: string | number;
  subtitle: string;
  color: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalPosts: 0,
    recentActivity: 0,
    growthRate: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStats({
        totalUsers: 156,
        totalPosts: 342,
        recentActivity: 23,
        growthRate: 12.5
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const StatCard = ({ icon: Icon, title, value, subtitle, color }: StatCardProps) => (
    <div className="card stat-card">
      <div className="stat-header">
        <div className={`stat-icon ${color}`}>
          <Icon size={24} />
        </div>
        <div className="stat-trend">
          <FiTrendingUp size={16} />
          <span>+{Math.floor(Math.random() * 20)}%</span>
        </div>
      </div>
      <div className="stat-content">
        <h3 className="stat-value">
          {loading ? <div className="spinner" /> : value}
        </h3>
        <p className="stat-title">{title}</p>
        <p className="stat-subtitle">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="container">
        {/* Hero Section */}
        <section className="dashboard-hero">
          <div className="hero-content">
            <h1>User Management Dashboard</h1>
            <p>Monitor, manage, and analyze your user base and content efficiently</p>
            <div className="hero-actions">
              <Link to="/users" className="btn btn-primary btn-lg">
                <FiUsers size={20} />
                Manage Users
                <FiArrowRight size={16} />
              </Link>
              <Link to="/posts" className="btn btn-secondary btn-lg">
                <FiFileText size={20} />
                View Posts
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="stats-section">
          <div className="grid grid-4">
            <StatCard
              icon={FiUsers}
              title="Total Users"
              value={stats.totalUsers}
              subtitle="Registered members"
              color="purple"
            />
            <StatCard
              icon={FiFileText}
              title="Total Posts"
              value={stats.totalPosts}
              subtitle="Published content"
              color="green"
            />
            <StatCard
              icon={FiActivity}
              title="Active Today"
              value={stats.recentActivity}
              subtitle="Users online"
              color="blue"
            />
            <StatCard
              icon={FiTrendingUp}
              title="Growth Rate"
              value={`${stats.growthRate}%`}
              subtitle="This month"
              color="pink"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions-section">
          <div className="section-header">
            <h2>Quick Actions</h2>
            <p>Common tasks and shortcuts</p>
          </div>

          <div className="grid grid-3">
            <div className="action-card">
              <div className="action-icon purple">
                <FiPlus size={24} />
              </div>
              <h3>Add New User</h3>
              <p>Register a new user to the system</p>
              <Link to="/users" className="action-link">
                Get Started <FiArrowRight size={14} />
              </Link>
            </div>

            <div className="action-card">
              <div className="action-icon green">
                <FiFileText size={24} />
              </div>
              <h3>Create Post</h3>
              <p>Publish new content for your users</p>
              <Link to="/posts" className="action-link">
                Create Now <FiArrowRight size={14} />
              </Link>
            </div>

            <div className="action-card">
              <div className="action-icon blue">
                <FiActivity size={24} />
              </div>
              <h3>View Analytics</h3>
              <p>Analyze user behavior and trends</p>
              <Link to="/analytics" className="action-link">
                View Data <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="recent-activity-section">
          <div className="section-header">
            <h2>Recent Activity</h2>
            <p>Latest updates from your platform</p>
          </div>

          <div className="activity-list">
            {[
              { type: 'user', action: 'New user registration', time: '2 minutes ago', user: 'John Doe' },
              { type: 'post', action: 'Post published', time: '5 minutes ago', user: 'Jane Smith' },
              { type: 'user', action: 'User profile updated', time: '10 minutes ago', user: 'Mike Johnson' },
              { type: 'post', action: 'Post liked', time: '15 minutes ago', user: 'Sarah Wilson' }
            ].map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-icon ${activity.type}`}>
                  {activity.type === 'user' ? <FiUsers size={16} /> : <FiFileText size={16} />}
                </div>
                <div className="activity-content">
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-user">by {activity.user}</p>
                </div>
                <span className="activity-time">{activity.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;