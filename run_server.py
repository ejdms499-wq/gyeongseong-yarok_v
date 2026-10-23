import os
import sys
import socket
import time
import threading
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

def get_local_ip():
    # 1. 192.168.x.x 우선 검색
    try:
        host = socket.gethostname()
        for ip in socket.gethostbyname_ex(host)[2]:
            if ip.startswith("192.168."):
                return ip
    except Exception:
        pass

    # 2. 소켓 연결 테스트
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        pass

    return "127.0.0.1"

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    port = 8765
    local_ip = get_local_ip()

    print("=" * 65)
    print("     경성야록 (京城野錄) 웹 서버가 성공적으로 시작되었습니다!")
    print("=" * 65)
    print()
    print("   [1] 스마트폰 / 태블릿 접속 주소 (192.168 로컬 IP)")
    print(f"       ▶▶ http://{local_ip}:{port}/")
    print()
    print("   [2] PC 브라우저 기본 접속 주소")
    print(f"       ▶▶ http://localhost:{port}/")
    print()
    print("   -------------------------------------------------------------")
    print("   ★ 모바일 접속 안내:")
    print("      스마트폰이나 태블릿이 이 PC와 같은 Wi-Fi에 연결되어 있다면")
    print("      모바일 브라우저(크롬/사파리) 주소창에 아래 주소를 입력하세요!")
    print(f"      [ http://{local_ip}:{port}/ ]")
    print()
    print("      3D 식자실 게임 바로 접속:")
    print(f"      [ http://{local_ip}:{port}/sikjasil/ ]")
    print("   -------------------------------------------------------------")
    print("   (서버를 종료하시려면 이 창을 닫거나 Ctrl+C 를 눌러주세요.)")
    print("=" * 65)
    print()

    # 1.5초 후 기본 브라우저 자동 실행
    def open_browser():
        time.sleep(1.5)
        webbrowser.open(f"http://{local_ip}:{port}/")

    threading.Thread(target=open_browser, daemon=True).start()

    # 0.0.0.0 바인딩으로 외부 모바일 기기 접속 허용
    server_address = ("0.0.0.0", port)
    httpd = ThreadingHTTPServer(server_address, SimpleHTTPRequestHandler)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n서버가 종료되었습니다.")

if __name__ == "__main__":
    main()
