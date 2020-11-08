// 循环相关
package main

import (
	"context"
	"time"
)

// 处理管道信号
func (s streamer) handleMsg(msg controlMsg) {
	switch msg.c {
	case startCycle:
		lPrintln("重启监听" + s.longID() + "的直播状态")
		mainCh <- msg
	case stopCycle:
		lPrintln("退出" + s.longID() + "的循环")
		sInfoMap.Lock()
		if _, ok := sInfoMap.info[s.UID]; ok {
			delete(sInfoMap.info, s.UID)
		} else {
			lPrintErr("sInfoMap没有%s的key", s.longID())
		}
		sInfoMap.Unlock()
	case quit:
	default:
		lPrintErr("未知的controlMsg：", msg)
	}
}

// 循环获取指定主播的直播状态，通知开播和自动下载直播
func (s streamer) cycle(liveID string) {
	defer func() {
		if err := recover(); err != nil {
			lPrintErr("Recovering from panic in cycle(), the error is:", err)
			lPrintErr(s.longID() + "的循环处理发生错误，尝试重启循环")

			restart := controlMsg{s: s, c: startCycle}
			mainCh <- restart
		}
	}()

	ch := make(chan controlMsg, 20)
	sInfoMap.Lock()
	if m, ok := sInfoMap.info[s.UID]; ok {
		m.ch = ch
	} else {
		sInfoMap.info[s.UID] = &streamerInfo{ch: ch}
	}
	sInfoMap.Unlock()

	// 设置文件里有该主播，但是不通知不下载
	if !(s.Notify.NotifyOn || s.Notify.NotifyOff || s.Notify.NotifyRecord || s.Notify.NotifyDanmu || s.Record || s.Danmu || s.KeepOnline) {
		for {
			msg := <-ch
			s.handleMsg(msg)
			return
		}
	}

	lPrintln("开始监听" + s.longID() + "的直播状态")

	var isLive bool
	for {
		select {
		case msg := <-ch:
			msg.liveID = liveID
			s.handleMsg(msg)
			return
		default:
			var modify bool
			sInfoMap.Lock()
			if m, ok := sInfoMap.info[s.UID]; ok {
				modify = m.modify
				m.modify = false
			} else {
				lPrintErr("sInfoMap没有%s的key", s.longID())
			}
			sInfoMap.Unlock()

			if s.isLiveOn() {
				isLive = true
				newLiveID := s.getLiveID()
				if newLiveID == "" {
					lPrintErrf("无法获取%s的liveID", s.longID())
					time.Sleep(time.Second)
					continue
				}

				if liveID != newLiveID || modify {
					liveID = newLiveID
					title := s.getTitle()
					lPrintln(s.longID() + "正在直播：" + title)
					lPrintln(s.Name + "的直播观看地址：" + s.getURL())

					if s.Notify.NotifyOn {
						desktopNotify(s.Name + "正在直播：" + title)
						msg := s.longID() + "正在直播：" + title + "，直播观看地址：" + s.getURL()
						s.sendCoolq(msg)
						s.sendMirai(msg)
					}

					info, _ := getLiveInfo(liveID)

					if s.Record && !info.isRecording {
						go s.recordLive(s.Danmu || s.KeepOnline)
					} else {
						lPrintln("如果要临时下载" + s.Name + "的直播视频，可以运行 startrecord " + s.itoa() + " 或 startrecdan " + s.itoa())
						// 不下载直播视频时下载弹幕
						if (s.Danmu && !info.isDanmu) || (s.KeepOnline && !info.isKeepOnline) {
							filename := getTime() + " " + s.Name + " " + s.getTitle()
							go s.initDanmu(mainCtx, liveID, filename)
						}
					}
				}
			} else {
				if isLive {
					isLive = false
					// 应付AcFun API可能出现的bug：主播没下播但API显示下播
					if !s.isLiveOnByPage() {
						msg := s.longID() + "已经下播"
						lPrintln(msg)
						if s.Notify.NotifyOff {
							desktopNotify(s.Name + "已经下播")
							s.sendCoolq(msg)
							s.sendMirai(msg)
						}
					}
				}
			}
		}

		time.Sleep(time.Second)
	}
}

// 循环检测删除lInfoMap.info里没有下载视频和弹幕以及不在挂机的key
func cycleDelKey(ctx context.Context) {
	for {
		select {
		case <-ctx.Done():
			return
		default:
			lInfoMap.Lock()
			for liveID, info := range lInfoMap.info {
				if !(info.isRecording || info.isDanmu || info.isKeepOnline) {
					delete(lInfoMap.info, liveID)
				}
			}
			lInfoMap.Unlock()

			// 每分钟循环一次
			time.Sleep(time.Minute)
		}
	}
}
