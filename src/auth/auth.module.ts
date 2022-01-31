import { UsuarioService } from 'src/usuario/usuario.service';
import { UsuarioModule } from './../usuario/usuario.module';
import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    forwardRef(() => UsuarioModule),
  ],
  providers: [AuthService, SessionSerializer, UsuarioService],
  exports: [AuthService],
})
export class AuthModule {}
