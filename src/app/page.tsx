import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-semibold text-xl">学</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">思考导师</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors hidden md:block">
            登录
          </Link>
          <Link href="/chat" className="bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
            开始聊天
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-24 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            智能学习伙伴，
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">启发思考</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            你的AI学习导师，引导你思考，而不仅仅是给答案。探索知识的奥秘，培养独立思考能力。
          </p>
        </div>

        {/* Chat Demo */}
        <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">ChatVerse 助手</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="9" y1="3" x2="9" y2="21"></line>
                </svg>
              </button>
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
            </div>
          </div>

          <div className="px-6 py-6 h-80 overflow-y-auto">
            <div className="flex gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
                <span className="text-white font-semibold text-xs">AI</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                <p className="text-gray-800 dark:text-gray-200">你好！我是思考导师，我会引导你学习和思考，而不是直接给你答案。让我们一起探索知识的奥秘吧！</p>
              </div>
            </div>

            <div className="flex flex-row-reverse gap-4 mb-6">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center">
                <span className="text-gray-700 dark:text-gray-300 font-semibold text-xs">你</span>
              </div>
              <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                <p className="text-gray-800 dark:text-gray-200">我不太理解二次函数的图像，你能帮我吗？</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
                <span className="text-white font-semibold text-xs">学</span>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                <p className="text-gray-800 dark:text-gray-200">
                  我很高兴你问这个问题！让我们一起思考二次函数的图像。

首先，你还记得二次函数的一般形式是什么吗？尝试回忆一下。

然后，我们可以思考：
1. 当a大于0时，函数的图像是什么形状？
2. 当a小于0时，会有什么变化？

试着先在纸上画一画，然后我们一起分析。你认为二次函数的图像和哪些日常生活中的物体形状相似呢？
                </p>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-full px-4 py-2">
              <input 
                type="text" 
                placeholder="输入您的问题..." 
                className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-200"
                disabled
              />
              <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div id="features" className="mt-24 w-full">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            我们的强大功能
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0
                24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                  <path d="M12 2v20"></path>
                  <path d="M2 12h20"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">智能回答</h4>
              <p className="text-gray-600 dark:text-gray-300">我们的AI能够提供周到准确的回答，具有上下文理解能力。</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                  <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
                  <path d="M9 12h6"></path>
                  <path d="M12 9v6"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">多模态能力</h4>
              <p className="text-gray-600 dark:text-gray-300">处理文本、图像和文档，提供全面的AI体验。</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                  <path d="M3 9h18"></path>
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">持续学习</h4>
              <p className="text-gray-600 dark:text-gray-300">我们的系统通过交互不断改进，随着时间提供更好的回答。</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 w-full max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 md:p-12 rounded-2xl text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">准备好体验AI的未来了吗？</h3>
            <p className="text-white/80 mb-6">加入已经在使用我们服务转变工作方式的数千用户行列。</p>
            <Link href="/chat" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              立即开始体验
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 md:px-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold text-xs">AI</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">© 2024 ChatVerse. 保留所有权利。</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              隐私政策
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              使用条款
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
              联系我们
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center mt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            由 DeepSeek AI 提供技术支持
          </p>
        </div>
      </footer>
    </div>
  );
}
