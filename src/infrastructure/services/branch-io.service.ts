import * as branchio from 'branchio-sdk';
import {ConfigService} from '@nestjs/config';
import {UserRole} from 'domain/entities/user.entity';
import {IBranchIoService} from 'app/modules/mail/services/branch-io.service';
import {Inject} from '@nestjs/common';

export class BranchIoService implements IBranchIoService {
    private readonly client: any;
    private readonly mobileAppUrl: string;
    private readonly webAppUrl: string;

    public constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
        this.client = branchio({
            appId: configService.get<string>('BRANCH_IO_APP_ID'),
            key: configService.get<string>('BRANCH_IO_KEY'),
            secret: configService.get<string>('BRANCH_IO_SECRET'),
        });
        this.mobileAppUrl = configService.get<string>('MOBILE_APP_URL');
        this.webAppUrl = configService.get<string>('WEB_APP_URL');
    }

    public async signUpLinkForPatient(email: string): Promise<string> {
        const marketingTitle = 'patient invite';
        const desktopUrl = `${this.webAppUrl}/sign-up-patient?email=${email}`;
        const iosDeeplinkPath = `${this.mobileAppUrl}auth?email=${email}&role=${UserRole.Patient}`;
        const androidDeeplinkPath = `${this.mobileAppUrl}auth?email=${email}&role=${UserRole.Patient}`;

        return await this.sendRequest(marketingTitle, desktopUrl, iosDeeplinkPath, androidDeeplinkPath);
    }

    public async signUpLinkForCaregiver(email: string): Promise<string> {
        const marketingTitle = 'caregiver invite';
        const desktopUrl = `${this.webAppUrl}/sign-up-caregiver?email=${email}`;
        const iosDeeplinkPath = `${this.mobileAppUrl}auth?email=${email}&role=${UserRole.Caregiver}`;
        const androidDeeplinkPath = `${this.mobileAppUrl}auth?email=${email}&role=${UserRole.Caregiver}`;

        return await this.sendRequest(marketingTitle, desktopUrl, iosDeeplinkPath, androidDeeplinkPath);
    }

    public async signUpLinkForDoctor(email: string): Promise<string> {
        const marketingTitle = 'doctor invite';
        const desktopUrl = `${this.webAppUrl}/sign-up-doctor?email=${email}`;
        const iosDeeplinkPath = `${this.mobileAppUrl}auth?email=${email}&role=${UserRole.Doctor}`;
        const androidDeeplinkPath = `${this.mobileAppUrl}auth?email=${email}&role=${UserRole.Doctor}`;

        return await this.sendRequest(marketingTitle, desktopUrl, iosDeeplinkPath, androidDeeplinkPath);
    }

    private async sendRequest(
        marketingTitle: string,
        desktopUrl: string,
        iosDeeplinkPath: string,
        androidDeeplinkPath: string,
    ): Promise<string> {
        const {url} = await this.client.link({
            data: {
                $og_title: 'Zenzers Medical',
                $og_description: 'Description',
                $og_image_url: `${this.webAppUrl}/favicon.png`,
                $marketing_title: marketingTitle,
                $desktop_url: desktopUrl,
                $ios_deeplink_path: iosDeeplinkPath,
                $android_deeplink_path: androidDeeplinkPath,
            },
        });

        return url;
    }
}
