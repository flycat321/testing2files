'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

// 定义消息类型
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// 简单的格式化函数，将纯文本转换为带有格式的文本
const formatMessage = (message: string): string => {
  // 检测是否已经是markdown格式
  if (message.includes('# ') || message.includes('## ') || message.includes('- ') || message.includes('1. ')) {
    return message;
  }

  // 将一些常见的结构转换为markdown
  let formattedText = message;
  
  // 处理可能的标题
  const titleMatch = formattedText.match(/^([^:：]*[:：])/);
  if (titleMatch && titleMatch[0].length < 40) {
    formattedText = formattedText.replace(titleMatch[0], `## ${titleMatch[0]}\n\n`);
  }

  // 处理主要标题（如果有）
  formattedText = formattedText.replace(/^(.*?)[:：](?=\s*\n)/gm, '## $1：\n\n');
  
  // 处理子标题（数字序号+标题）
  formattedText = formattedText.replace(/(\d+)[\.、]([^:]*)[:：]/g, '### <span class="num-point">$1.</span> $2：\n\n');
  
  // 处理数字列表，添加蓝色高亮
  formattedText = formattedText.replace(/(\n|^)(\d+)[\.、]([^\n:]*)/g, '$1<span class="num-point">$2.</span> $3');
  
  // 处理可能的强调词 - 教育和引导相关
  const importantTerms = [
    '思考一下', '提示', '重要', '注意', '想一想', '试一试', 
    '关键点', '记住', '回忆', '问问自己', '小贴士', '动手做', 
    '练习', '复习', '总结', '联系生活', '小实验'
  ];
  importantTerms.forEach(term => {
    const regex = new RegExp(`(${term})`, 'g');
    formattedText = formattedText.replace(regex, '<span class="highlight">$1</span>');
  });

  // 处理特殊标记块
  // 1. 思考块
  formattedText = formattedText.replace(
    /思考：([\s\S]*?)(?=\n\n|$)/g, 
    '<div class="thinking-block">\n<strong>思考：</strong>\n$1\n</div>'
  );
  
  // 2. 例子块
  formattedText = formattedText.replace(
    /例子：([\s\S]*?)(?=\n\n|$)/g, 
    '<div class="example-block">\n<strong>例子：</strong>\n$1\n</div>'
  );
  
  // 3. 引用块（提示和小贴士）
  formattedText = formattedText.replace(
    /小贴士：([\s\S]*?)(?=\n\n|$)/g, 
    '> <span class="tip">小贴士：</span> $1'
  );

  // 突出显示问题和提问
  formattedText = formattedText.replace(/([^。？！\n]*？)/g, (match) => {
    // 检查是否已经包含span标签，避免重复添加
    if (match.includes('<span') || match.length < 5) return match;
    return '<span class="question">' + match + '</span>';
  });
  
  // 突出显示术语定义
  formattedText = formattedText.replace(/([A-Za-z\u4e00-\u9fa5]+)[:：]([^\n]*)/g, '<span class="primary">$1</span>：$2');
  
  // 处理可能的小点列表
  formattedText = formattedText.replace(/([^\n])[\n]• /g, '$1\n\n- ');
  formattedText = formattedText.replace(/([^\n])[\n]· /g, '$1\n\n- ');
  formattedText = formattedText.replace(/([^\n])[\n]· /g, '$1\n\n- ');
  
  // 处理可能的段落
  formattedText = formattedText.replace(/\n{2,}/g, '\n\n');
  
  // 为初中学科相关术语添加颜色
  const subjectTerms = {
    // 数学相关术语
    math: ['方程', '函数', '三角形', '圆', '比例', '概率', '统计', '平行', '垂直', '坐标', '图形', 
      '代数', '几何', '数轴', '正比例', '反比例', '勾股定理', '相似三角形', '二次函数'],
    
    // 科学相关术语（物理、化学、生物）
    science: ['力', '质量', '速度', '加速度', '重力', '电流', '电压', '电阻', '热量', '功', '能量', '光', '声音',
      '元素', '分子', '原子', '化合物', '化学反应', '酸', '碱', '盐', '氧化', '还原',
      '细胞', '组织', '器官', '系统', '光合作用', '呼吸', '消化', '循环', '遗传', '进化'],
    
    // 语言相关术语（语文、英语）
    language: ['修辞', '比喻', '拟人', '夸张', '排比', '主语', '谓语', '宾语', '定语', '状语', '补语',
      '名词', '动词', '形容词', '副词', '代词', '介词', '连词', '时态', '语态']
  };
  
  // 为不同学科的术语添加不同的样式类
  Object.entries(subjectTerms).forEach(([subject, terms]) => {
    const regex = new RegExp(`\\b(${terms.join('|')})\\b`, 'g');
    formattedText = formattedText.replace(regex, `<span class="${subject}">$1</span>`);
  });
  
  return formattedText;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: '你是由DeepSeek提供支持的学习助手，专为初中生设计。你会引导学生思考并帮助他们自主学习，而不是直接提供答案。请鼓励学生思考，用问题引导他们，而不是直接告诉他们答案。',
    },
    {
      role: 'assistant',
      content: '你好！我是学习导师AI，很高兴能帮助你学习和探索知识。请记住，学习最重要的不是得到答案，而是理解思考的过程。当你有问题时，我会引导你思考并找到解决方法，而不只是告诉你答案。你现在有什么想了解或学习的问题吗？',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 发送消息并获取响应
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // 添加用户消息
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // 准备发送给API的所有消息历史
      const messagesToSend = [...messages, userMessage];

      // 调用我们的API端点
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messagesToSend,
        }),
      });

      if (!response.ok) {
        throw new Error('API请求失败');
      }

      const data = await response.json();
      
      // 从响应中提取AI助手的回复
      const assistantMessage = data.choices[0].message;
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('聊天请求错误:', error);
      // 添加错误消息
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '抱歉，我处理您的请求时遇到了问题。请稍后再试。',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // 处理按键事件（Enter发送消息）
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Header */}
      <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold text-xl">学</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">思考导师</h1>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => setMessages([
              {
                role: 'system',
                content: '你是由DeepSeek提供支持的学习助手，专为初中生设计。你会引导学生思考并帮助他们自主学习，而不是直接提供答案。请鼓励学生思考，用问题引导他们，而不是直接告诉他们答案。',
              },
              {
                role: 'assistant',
                content: '你好！我是学习导师AI，很高兴能帮助你学习和探索知识。请记住，学习最重要的不是得到答案，而是理解思考的过程。当你有问题时，我会引导你思考并找到解决方法，而不只是告诉你答案。你现在有什么想了解或学习的问题吗？',
              },
            ])}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v6h6"></path>
              <path d="M21 12A9 9 0 0 0 6 5.3L3 8"></path>
              <path d="M21 22v-6h-6"></path>
              <path d="M3 12a9 9 0 0 0 15 6.7l3-2.7"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 md:p-8">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.filter(msg => msg.role !== 'system').map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-gray-200 dark:bg-gray-700' 
                    : 'bg-gradient-to-br from-blue-500 to-purple-600'
                }`}>
                  <span className={`font-semibold text-xs ${
                    message.role === 'user' 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : 'text-white'
                  }`}>
                    {message.role === 'user' ? '你' : 'AI'}
                  </span>
                </div>
                <div className={`p-4 rounded-2xl max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-blue-50 dark:bg-gray-800 rounded-tr-none' 
                    : 'bg-gray-100 dark:bg-gray-900 rounded-tl-none'
                }`}>
                  {message.role === 'assistant' ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
                      <ReactMarkdown 
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          // 自定义组件渲染
                          h1: ({node, ...props}) => <h1 className="text-2xl font-bold my-3" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-xl font-bold my-3" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-lg font-semibold my-2" {...props} />,
                          p: ({node, ...props}) => <p className="my-2" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-2" {...props} />,
                          li: ({node, ...props}) => <li className="my-1" {...props} />,
                          a: ({node, ...props}) => <a className="text-blue-500 hover:underline" {...props} />
                        }}
                      >
                        {formatMessage(message.content)}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">AI</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-2xl rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse delay-75"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 animate-pulse delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 rounded-full px-4 py-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="输入您的问题..."
              className="flex-1 bg-transparent border-none focus:outline-none text-gray-800 dark:text-gray-200 max-h-32 min-h-[44px] resize-none py-2"
              rows={1}
              style={{ overflow: 'auto' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className={`p-2 rounded-full ${
                isLoading || !input.trim()
                  ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            由 DeepSeek AI 提供支持
          </p>
        </div>
      </main>
    </div>
  );
} 