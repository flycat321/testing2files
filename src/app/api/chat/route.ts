import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// 定义消息类型
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

// 初始化客户端，设置API密钥和基础URL
const client = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || 'sk-3cbcf2d06e00427ebe4b8bca42e09e72',
  baseURL: 'https://api.deepseek.com/v1',
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { messages } = body as { messages: Message[] };

    // 确保第一条消息是系统消息，引导AI生成格式化输出
    if (!messages.some(msg => msg.role === 'system')) {
      // 在消息开头添加系统消息
      messages = [
        {
          role: 'system',
          content: `你是由DeepSeek提供支持的AI学习助手，专为初中生设计。你的目标是引导学生思考并帮助他们自主学习，而不是直接提供答案。
          
在回答时遵循以下规则：
1. 使用初中生能理解的语言，避免过于复杂的术语，必要时提供简单易懂的解释
2. 采用苏格拉底式提问法，通过问题引导学生思考
3. 当学生询问问题时，先帮助他们理解问题，然后引导他们思考解决方案的步骤
4. 使用"你觉得...?"、"你能想到...吗?"等提问方式鼓励学生主动思考
5. 提供思考的方向和提示，而不是直接给出完整答案
6. 对于数学问题，引导学生思考解题步骤
7. 对于知识性问题，引导学生回忆相关概念并建立联系
8. 使用生动的比喻和实例，帮助学生理解抽象概念
9. 鼓励学生探索和提出自己的想法
10. 赞美学生的思考过程和努力，而不仅是正确答案

在格式方面：
1. 使用清晰的标题和子标题：重要的标题会显示为蓝紫色渐变
2. 使用编号列表组织思考步骤：数字会以蓝色突出显示
3. 使用项目符号组织提示和线索
4. 对重要概念使用"概念：简单解释"的格式
5. 关键词如"思考一下"、"提示"、"重要"等会高亮显示
6. 保持内容友好、鼓励性并具有引导性`,
        },
        ...messages,
      ];
    } else {
      // 修改现有的系统消息
      messages = messages.map((msg: Message) => {
        if (msg.role === 'system') {
          return {
            role: 'system',
            content: `${msg.content}
            
在回答时遵循以下规则：
1. 使用初中生能理解的语言，避免过于复杂的术语，必要时提供简单易懂的解释
2. 采用苏格拉底式提问法，通过问题引导学生思考
3. 当学生询问问题时，先帮助他们理解问题，然后引导他们思考解决方案的步骤
4. 使用"你觉得...?"、"你能想到...吗?"等提问方式鼓励学生主动思考
5. 提供思考的方向和提示，而不是直接给出完整答案
6. 对于数学问题，引导学生思考解题步骤
7. 对于知识性问题，引导学生回忆相关概念并建立联系
8. 使用生动的比喻和实例，帮助学生理解抽象概念
9. 鼓励学生探索和提出自己的想法
10. 赞美学生的思考过程和努力，而不仅是正确答案

在格式方面：
1. 使用清晰的标题和子标题：重要的标题会显示为蓝紫色渐变
2. 使用编号列表组织思考步骤：数字会以蓝色突出显示
3. 使用项目符号组织提示和线索
4. 对重要概念使用"概念：简单解释"的格式
5. 关键词如"思考一下"、"提示"、"重要"等会高亮显示
6. 保持内容友好、鼓励性并具有引导性`,
          };
        }
        return msg;
      });
    }

    // 调用DeepSeek API
    const response = await client.chat.completions.create({
      model: 'deepseek-chat', // 使用DeepSeek的模型
      messages: messages, // 传递对话历史
      temperature: 0.7, // 可调整的创造性参数
      max_tokens: 1000, // 最大令牌数
    });

    // 返回响应
    return NextResponse.json(response);
  } catch (error: any) {
    console.error('DeepSeek API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during the API call' },
      { status: 500 }
    );
  }
} 