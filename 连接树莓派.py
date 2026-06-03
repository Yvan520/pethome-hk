#!/usr/bin/env python3
"""
树莓派 SSH 控制脚本
用于Hermes Voice Assistant连接到树莓派
"""

import subprocess
import os
import sys

# 树莓派配置
PI_HOST = "192.168.31.219"
PI_USER = "pi"
PI_PASSWORD = "raspberry"
PI_JBL_MAC = "00:42:79:C6:AC:6D"

def run_ssh(command):
    """执行SSH命令"""
    cmd = f'sshpass -p {PI_PASSWORD} ssh -o StrictHostKeyChecking=no {PI_USER}@{PI_HOST} "{command}"'
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return result.stdout, result.stderr

def connect_jbl():
    """连接到JBL蓝牙音响"""
    stdout, stderr = run_ssh("bluetoothctl info")
    if PI_JBL_MAC in stdout:
        print("JBL已连接")
        return True
    
    print("正在连接JBL Flip 4...")
    run_ssh("bluetoothctl connect 00:42:79:C6:AC:6D")
    return True

def play_sound(text):
    """在树莓派上播放TTS语音"""
    cmd = f'python3 -c "from gtts import gTTS; gTTS(\\"{text}\").save(\"/tmp/tts.mp3\")"'
    run_ssh(cmd)
    run_ssh("ffmpeg -i /tmp/tts.mp3 -ar 44100 -ac 2 /tmp/tts.wav -y && paplay /tmp/tts.wav")

def play_music():
    """播放音乐"""
    run_ssh("paplay /path/to/music.mp3")

def status():
    """检查状态"""
    stdout, _ = run_ssh("bluetoothctl info")
    connected = "Connected: yes" in stdout
    return {"jbl_connected": connected}

def main():
    if len(sys.argv) < 2:
        print("用法: raspberry.py <命令>")
        print("命令: connect-jbl, play-sound, status")
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "connect-jbl":
        connect_jbl()
    elif command == "status":
        print(status())
    elif command == "play-sound":
        text = " ".join(sys.argv[2:]) if len(sys.argv) > 2 else "Hello"
        play_sound(text)
    else:
        print(f"未知命令: {command}")

if __name__ == "__main__":
    main()