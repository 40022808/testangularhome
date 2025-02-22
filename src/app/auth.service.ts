import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    // 这里可以添加具体的逻辑，例如检查本地存储或调用后端 API 以确定用户是否已登录
    return !!localStorage.getItem('userToken');
  }

  login(): void {
    // 模拟登录逻辑
    localStorage.setItem('userToken', 'sampleToken');
  }

  logout(): void {
    // 模拟登出逻辑
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }
}
