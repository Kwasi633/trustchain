import React, { useState, useEffect } from 'react';
import { trustchain_backend } from 'declarations/trustchain_backend';

// ---------------------
// Header Component
// ---------------------
function Header({ isConnected, currentUser, userScore, onConnect, onDisconnect }) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h1 className="ml-2 text-xl font-bold text-gray-900">TrustChain</h1>
        </div>
        {isConnected ? (
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <p className="text-sm font-medium text-gray-900">{currentUser}</p>
              <p className="text-xs text-gray-500">Reputation: {userScore}</p>
            </div>
            <button
              onClick={onDisconnect}
              className="bg-white text-indigo-600 border border-indigo-600 px-3 py-1 rounded-md text-sm font-medium hover:bg-indigo-50 transition duration-150"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={onConnect}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-150"
          >
            Connect with Internet Identity
          </button>
        )}
      </div>
    </header>
  );
}

// ---------------------
// Dashboard Component
// ---------------------
function Dashboard({ reputationDetails, verifiedCredentials, isLoading }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Reputation Dashboard</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reputation Score Card */}
          <div className="bg-white rounded-lg shadow p-6 transition duration-300 hover:shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Reputation Score</h3>
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <svg className="w-40 h-40">
                  <circle
                    className="text-gray-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="60"
                    cx="80"
                    cy="80"
                  />
                  <circle
                    className="text-indigo-500"
                    strokeWidth="10"
                    strokeDasharray={`${reputationDetails?.overall * 3.77} 376.8`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="60"
                    cx="80"
                    cy="80"
                  />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-3xl font-bold">{reputationDetails?.overall}</span>
                    <span className="text-sm text-green-500 block">{reputationDetails?.growth}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {reputationDetails &&
                Object.entries(reputationDetails.components).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-sm font-medium capitalize mb-1">{key}</div>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium w-6 text-right">{value}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          {/* Verified Credentials Card */}
          <div className="bg-white rounded-lg shadow p-6 transition duration-300 hover:shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Verified Credentials</h3>
            <div className="space-y-4">
              {verifiedCredentials.map((credential) => (
                <div key={credential.id} className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <svg
                      className="w-5 h-5 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{credential.name}</h4>
                    <p className="text-sm text-gray-500">Issued by {credential.issuer}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-indigo-600">{credential.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------
// Stake Component
// ---------------------
function Stake({ stakeAmount, setStakeAmount, handleStakeReputation, isLoading }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Reputation Staking</h2>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <p className="mb-6 text-gray-700 leading-relaxed">
          Stake your ICP to boost your reputation score and participate in the ecosystem.
          Staking demonstrates your commitment to the network and unlocks additional features.
        </p>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount to Stake (ICP)
          </label>
          <input
            type="number"
            min="0"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-medium mb-3 text-gray-800">Staking Benefits</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Reputation amplification based on stake amount</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Access to exclusive reputation-gated opportunities</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Earn reputation yields from network participation</span>
            </li>
          </ul>
        </div>
        <button
          onClick={handleStakeReputation}
          disabled={stakeAmount <= 0 || isLoading}
          className={`w-full py-3 px-4 rounded-md font-medium transition duration-150 ${
            stakeAmount > 0 && !isLoading
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? 
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span> : 'Stake Now'
          }
        </button>
      </div>
    </div>
  );
}

// ---------------------
// Activity Component
// ---------------------
function Activity({ transactionHistory }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Activity History</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactionHistory.length > 0 ? (
                transactionHistory.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 transition duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{tx.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{tx.amount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{tx.date}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-sm text-gray-500">
                    No transaction history available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------------
// Notifications Component
// ---------------------
function Notifications({ notifications }) {
  const unreadNotifications = notifications.filter((n) => !n.read);
  if (unreadNotifications.length === 0) return null;
  return (
    <div className="bg-indigo-50 rounded-lg p-4 mb-6 flex items-start">
      <div className="flex-shrink-0">
        <svg className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      </div>
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-start">
          <p className="text-sm font-medium text-indigo-800">
            {unreadNotifications.length} new notification{unreadNotifications.length > 1 ? 's' : ''}
          </p>
          <button className="text-xs text-indigo-600 hover:text-indigo-800">
            View all
          </button>
        </div>
        <p className="mt-1 text-sm text-indigo-700">
          {unreadNotifications[0].message}
        </p>
      </div>
    </div>
  );
}

// ---------------------
// Tabs Component
// ---------------------
function Tabs({ activeTab, setActiveTab }) {
  return (
    <nav className="flex border-b border-gray-200 mb-6" aria-label="Tabs">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`py-3 px-6 text-sm font-medium border-b-2 -mb-px ${
          activeTab === 'dashboard' 
            ? 'border-indigo-500 text-indigo-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        Dashboard
      </button>
      <button
        onClick={() => setActiveTab('stake')}
        className={`py-3 px-6 text-sm font-medium border-b-2 -mb-px ${
          activeTab === 'stake' 
            ? 'border-indigo-500 text-indigo-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        Stake Reputation
      </button>
      <button
        onClick={() => setActiveTab('activity')}
        className={`py-3 px-6 text-sm font-medium border-b-2 -mb-px ${
          activeTab === 'activity' 
            ? 'border-indigo-500 text-indigo-600' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        Activity
      </button>
    </nav>
  );
}

// ---------------------
// Main App Component
// ---------------------
function App() {
  // State management
  const [isConnected, setIsConnected] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userScore, setUserScore] = useState(null);
  const [reputationDetails, setReputationDetails] = useState(null);
  const [verifiedCredentials, setVerifiedCredentials] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);

  // Simulate data fetch when connected
  useEffect(() => {
    if (isConnected) {
      setIsLoading(true);
      setTimeout(() => {
        setReputationDetails({
          overall: 85,
          components: {
            financial: 82,
            social: 88,
            technical: 91,
            governance: 75
          },
          growth: '+3.2%'
        });
        setVerifiedCredentials([
          { id: 1, name: 'GitHub Contributor', issuer: 'GitHub', verified: true, score: 82 },
          { id: 2, name: 'DeFi Power User', issuer: 'Sonic', verified: true, score: 78 },
          { id: 3, name: 'Early Adopter', issuer: 'ICP Ecosystem', verified: true, score: 95 }
        ]);
        setTransactionHistory([
          { id: 1, type: 'Reputation Stake', amount: '25 ICP', date: '2025-03-15', status: 'Completed' },
          { id: 2, type: 'Credential Verification', amount: '0.5 ICP', date: '2025-03-10', status: 'Completed' },
          { id: 3, type: 'Identity Attestation', amount: '1 ICP', date: '2025-03-05', status: 'Completed' }
        ]);
        setNotifications([
          { id: 1, message: 'Your reputation score increased by 2.5 points', date: '2025-03-18', read: false },
          { id: 2, message: 'New credential verification request from Sonic', date: '2025-03-17', read: false },
          { id: 3, message: 'Congratulations! You\'re in the top 10% of trusted users', date: '2025-03-15', read: true }
        ]);
        setIsLoading(false);
      }, 1500);
    }
  }, [isConnected]);

  // Connection handlers
  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // Simulate Internet Identity connection
      setTimeout(() => {
        setIsConnected(true);
        setCurrentUser('7fc..a3b');
        setUserScore(85);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Connection error:', error);
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setCurrentUser(null);
    setUserScore(null);
    setReputationDetails(null);
    setActiveTab('dashboard');
  };

  const handleStakeReputation = () => {
    if (stakeAmount > 0) {
      setIsLoading(true);
      // Simulate staking process
      setTimeout(() => {
        setTransactionHistory([
          { id: transactionHistory.length + 1, type: 'Reputation Stake', amount: `${stakeAmount} ICP`, date: '2025-03-19', status: 'Completed' },
          ...transactionHistory
        ]);
        setUserScore((prev) => Math.min(100, prev + Math.floor(stakeAmount / 10)));
        setReputationDetails((prev) => ({
          ...prev,
          overall: Math.min(100, prev.overall + Math.floor(stakeAmount / 10)),
          growth: `+${(Math.floor(stakeAmount / 10) / prev.overall * 100).toFixed(1)}%`
        }));
        setIsLoading(false);
        setStakeAmount(0);
        setActiveTab('dashboard');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header
        isConnected={isConnected}
        currentUser={currentUser}
        userScore={userScore}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isConnected ? (
          <div className="bg-white rounded-lg shadow p-8 max-w-md mx-auto text-center">
            <svg className="mx-auto h-16 w-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome to TrustChain</h2>
            <p className="mt-2 text-lg text-gray-600">
              The decentralized reputation layer built exclusively on ICP's stack
            </p>
            <div className="mt-8 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <h3 className="font-medium text-gray-900 mb-2">Key Features:</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Portable reputation across Web3 applications</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Verifiable credentials with cryptographic proofs</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Stake ICP to boost your reputation score</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={handleConnect}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </span>
                ) : (
                  "Connect with Internet Identity"
                )}
              </button>
            </div>
          </div>
        ) : (
          <>
            <Notifications notifications={notifications} />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === 'dashboard' && (
              <Dashboard
                reputationDetails={reputationDetails}
                verifiedCredentials={verifiedCredentials}
                isLoading={isLoading}
              />
            )}
            {activeTab === 'stake' && (
              <Stake
                stakeAmount={stakeAmount}
                setStakeAmount={setStakeAmount}
                handleStakeReputation={handleStakeReputation}
                isLoading={isLoading}
              />
            )}
            {activeTab === 'activity' && <Activity transactionHistory={transactionHistory} />}
          </>
        )}
      </main>
      <footer className="bg-white shadow mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Built exclusively on the Internet Computer Protocol • Akwaaba Dapps Hackathon 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;